"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/projects";
import { ArrowIcon, Brand } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const query = window.matchMedia("(min-width: 1000px)");
    const onResize = () => {
      if (query.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    query.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      query.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button-accent header-cta" href="#projects">
          Выбрать квартиру <ArrowIcon diagonal />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Закрыть" : "Меню"}</span>
          <span className={`menu-lines ${open ? "is-open" : ""}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-nav" aria-label="Мобильная навигация" hidden={!open}>
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <ArrowIcon diagonal />
          </a>
        ))}
        <a className="button button-accent" href="#projects" onClick={() => setOpen(false)}>
          Выбрать квартиру
        </a>
      </nav>
    </header>
  );
}
