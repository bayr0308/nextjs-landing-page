"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectStatus } from "@/data/projects";
import { ArrowIcon, PinIcon } from "./icons";
import { useSelection } from "./selection-provider";

const filters: ("Все" | ProjectStatus)[] = ["Все", "В продаже", "Скоро старт", "Сдан"];

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { consult } = useSelection();
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const dismissBackdrop = (event: MouseEvent) => {
      if (!dialog || event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    };
    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const controls = dialog.querySelectorAll<HTMLElement>(
        "button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), [tabindex='0']",
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    dialog?.showModal();
    dialog?.addEventListener("click", dismissBackdrop);
    dialog?.addEventListener("keydown", keepFocusInside);
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.removeEventListener("click", dismissBackdrop);
      dialog?.removeEventListener("keydown", keepFocusInside);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClose={onClose}
    >
      <div className="dialog-content">
        <div className="dialog-image">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 800px) 100vw, 900px"
          />
          <span className="project-status">{project.status}</span>
        </div>
        <button
          className="dialog-close"
          aria-label="Закрыть описание проекта"
          onClick={() => dialogRef.current?.close()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <div className="dialog-body">
          <p className="project-location">
            <PinIcon />
            {project.location}
          </p>
          <div className="dialog-title-row">
            <h2 id="dialog-title">{project.name}</h2>
            <span>{project.price}</span>
          </div>
          <p id="dialog-description">{project.description}</p>
          <dl className="dialog-facts">
            <div>
              <dt>Класс жилья</dt>
              <dd>{project.className}</dd>
            </div>
            <div>
              <dt>Срок сдачи</dt>
              <dd>{project.completion}</dd>
            </div>
            <div>
              <dt>Площадь квартир</dt>
              <dd>{project.area}</dd>
            </div>
            <div>
              <dt>Высота домов</dt>
              <dd>{project.floors}</dd>
            </div>
          </dl>
          <p className="dialog-feature">{project.feature}</p>
          <button
            className="button button-accent"
            onClick={() => {
              dialogRef.current?.close();
              consult(project.id);
            }}
          >
            Получить консультацию <ArrowIcon diagonal />
          </button>
          <p className="demo-note">
            Вымышленный проект. Характеристики и цены приведены для демонстрации.
          </p>
        </div>
      </div>
    </dialog>
  );
}

export function ProjectExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Все");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const visibleProjects =
    filter === "Все" ? projects : projects.filter((project) => project.status === filter);

  return (
    <>
      <div className="project-toolbar">
        <fieldset className="project-filters">
          <legend className="sr-only">Статус жилого комплекса</legend>
          {filters.map((item) => (
            <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item}
              {item === "Все" ? <span>4</span> : null}
            </button>
          ))}
        </fieldset>
        <span className="project-counter" aria-live="polite">
          {filter === "Все"
            ? "Четыре характера. Один подход."
            : `Проектов: ${visibleProjects.length}`}
        </span>
      </div>
      <div className={`projects-grid ${filter !== "Все" ? "is-filtered" : ""}`}>
        {visibleProjects.map((project) => (
          <article className={`project-card project-${project.id}`} key={project.id}>
            <button
              className="project-open"
              onClick={() => setActiveProject(project)}
              aria-label={`Подробнее о ЖК «${project.name}»`}
              aria-haspopup="dialog"
            >
              <div className="project-photo">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1000px) 48vw, 52vw"
                />
                <span
                  className={`project-status ${project.status === "Скоро старт" ? "status-soon" : ""}`}
                >
                  {project.status}
                </span>
                <span className="project-class">{project.className}</span>
                <span className="project-arrow">
                  <ArrowIcon diagonal />
                </span>
              </div>
              <div className="project-title-row">
                <h3>{project.name}</h3>
                <span className="project-price">{project.price}</span>
              </div>
              <p className="project-location">
                <PinIcon />
                {project.location}
              </p>
              <div className="project-bottom">
                <span>{project.character}</span>
                <span>{project.completion}</span>
              </div>
            </button>
          </article>
        ))}
      </div>
      {activeProject ? (
        <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
      ) : null}
    </>
  );
}
