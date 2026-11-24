// Liquid glass button & pill toolbar (inspiré du composant goodui « Liquid glass
// button », réécrit ici sans dépendance : le registre goodui n'est pas joignable
// depuis l'environnement de build).
//
// - Verre dépoli : backdrop-filter (flou + saturation), teinte claire ou fumée.
// - Liseré lumineux (rim light) en dégradé sur le bord.
// - Reflet spéculaire qui suit le pointeur : variables CSS --lg-x / --lg-y
//   écrites au mouvement, sans re-render.
// - Sans backdrop-filter (@supports) ou avec `fallback`, teinte presque opaque.
// - Toolbar : rôle « toolbar », éléments aria-pressed, loupe qui glisse vers
//   l'élément sélectionné, flèches / Début / Fin pour naviguer.
// Les styles sont dans index.css (classes .lg-*).
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type Tone = "light" | "dark";
type Size = "sm" | "md" | "lg" | "icon";

const cx = (...parts: unknown[]) => parts.filter((part) => typeof part === "string" && part).join(" ");

function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--lg-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--lg-y", `${event.clientY - rect.top}px`);
}

/** Classes du verre, pour habiller un élément qui n'est pas un bouton (lien, div). */
export function liquidGlassClass(tone: Tone = "light", fallback = false) {
  return cx("lg-glass", tone === "dark" ? "lg-dark" : "lg-light", fallback && "lg-fallback");
}

const sizeClass: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-[15px] gap-2",
  icon: "h-11 w-11 justify-center",
};

export type LiquidGlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: Tone;
  blur?: number;
  fallback?: boolean;
  size?: Size;
};

export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(function LiquidGlassButton(
  { tone = "light", blur = 14, fallback = false, size = "md", className, style, onPointerMove, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      onPointerMove={(event) => {
        trackPointer(event);
        onPointerMove?.(event);
      }}
      style={{ ...(style as object), ["--lg-blur" as string]: `${blur}px` }}
      className={cx(
        liquidGlassClass(tone, fallback),
        "lg-press inline-flex shrink-0 items-center rounded-full font-semibold",
        sizeClass[size],
        className,
      )}
    >
      <span className="relative z-[2] inline-flex items-center gap-[inherit]">{children}</span>
    </button>
  );
});

type ToolbarContext = {
  value: string | undefined;
  select: (value: string) => void;
  register: (value: string, el: HTMLButtonElement | null) => void;
};

const ToolbarCtx = createContext<ToolbarContext | null>(null);

export type LiquidGlassToolbarProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  tone?: Tone;
  blur?: number;
  fallback?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function LiquidGlassToolbar({
  tone = "light",
  blur = 16,
  fallback = false,
  value,
  defaultValue,
  onValueChange,
  className,
  style,
  children,
  ...rest
}: LiquidGlassToolbarProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const rootRef = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<string, HTMLButtonElement>());
  const [lens, setLens] = useState<{ left: number; width: number } | null>(null);

  const select = useCallback(
    (next: string) => {
      if (value === undefined) setInner(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  const register = useCallback((key: string, el: HTMLButtonElement | null) => {
    if (el) items.current.set(key, el);
    else items.current.delete(key);
  }, []);

  const measure = useCallback(() => {
    const el = current ? items.current.get(current) : undefined;
    const root = rootRef.current;
    if (!el || !root) return setLens(null);
    const r = root.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    setLens({ left: e.left - r.left, width: e.width });
  }, [current]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = [...items.current.values()].sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    const index = list.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % list.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + list.length) % list.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = list.length - 1;
    if (next >= 0) {
      event.preventDefault();
      list[next].focus();
    }
  };

  return (
    <ToolbarCtx.Provider value={{ value: current, select, register }}>
      <div
        ref={rootRef}
        role="toolbar"
        {...rest}
        onKeyDown={onKeyDown}
        onPointerMove={trackPointer}
        style={{ ...(style as object), ["--lg-blur" as string]: `${blur}px` }}
        className={cx(liquidGlassClass(tone, fallback), "relative inline-flex items-center gap-0.5 rounded-full p-1", className)}
      >
        <span
          aria-hidden="true"
          className={cx("lg-lens", tone === "dark" ? "lg-lens-dark" : "lg-lens-light")}
          style={{
            transform: `translateX(${lens?.left ?? 0}px)`,
            width: lens?.width ?? 0,
            opacity: lens ? 1 : 0,
          }}
        />
        {children}
      </div>
    </ToolbarCtx.Provider>
  );
}

export type LiquidGlassToolbarItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  compact?: boolean;
};

export function LiquidGlassToolbarItem({ value, compact = false, className, onClick, children, ...rest }: LiquidGlassToolbarItemProps) {
  const ctx = useContext(ToolbarCtx);
  if (!ctx) throw new Error("LiquidGlassToolbarItem doit être dans un LiquidGlassToolbar");
  const selected = ctx.value === value;
  const { register } = ctx;
  const ref = useCallback((el: HTMLButtonElement | null) => register(value, el), [register, value]);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      tabIndex={selected || ctx.value === undefined ? 0 : -1}
      {...rest}
      onClick={(event) => {
        ctx.select(value);
        onClick?.(event);
      }}
      className={cx(
        "lg-item relative z-[2] inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition-colors duration-300",
        selected ? "text-current" : "opacity-70 hover:opacity-100",
        compact && "[&>span]:hidden sm:[&>span]:inline",
        className,
      )}
    >
      {children}
    </button>
  );
}
