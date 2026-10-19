"use client";

import { useState, type FormEvent } from "react";
import { projects } from "@/data/projects";
import { ArrowIcon } from "./icons";
import { useSelection } from "./selection-provider";

type Errors = { name?: string; phone?: string };

export function ConsultationForm() {
  const { selectedProject, setSelectedProject } = useSelection();
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    const nextErrors: Errors = {};
    if (name.length < 2 || name.length > 60 || !/^[\p{L}]+(?:[\s’'-][\p{L}]+)*$/u.test(name)) {
      nextErrors.name = "Введите имя: от 2 до 60 букв. Можно использовать пробел и дефис.";
    }
    if (!/^\+?[\d\s()-]+$/.test(phone) || !/^[78]\d{10}$/.test(digits)) {
      nextErrors.phone = "Введите 11 цифр, начиная с +7 или 8. Например: +7 999 123-45-67.";
    }
    setErrors(nextErrors);
    const firstError = nextErrors.name
      ? "consultation-name"
      : nextErrors.phone
        ? "consultation-phone"
        : null;
    if (firstError) {
      setSuccess(null);
      document.getElementById(firstError)?.focus();
      return;
    }
    setSuccess(selectedProject);
  }

  return (
    <form
      className="consultation-form"
      noValidate
      onSubmit={submit}
      onChange={() => setSuccess(null)}
    >
      <div className="form-field">
        <label htmlFor="consultation-name">
          Ваше имя <span aria-hidden="true">*</span>
        </label>
        <input
          id="consultation-name"
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Как к вам обращаться"
          maxLength={60}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={() => setErrors((previous) => ({ ...previous, name: undefined }))}
        />
        {errors.name ? (
          <p className="field-error" id="name-error">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="consultation-phone">
          Телефон <span aria-hidden="true">*</span>
        </label>
        <input
          id="consultation-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
          maxLength={25}
          required
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          onChange={() => setErrors((previous) => ({ ...previous, phone: undefined }))}
        />
        {errors.phone ? (
          <p className="field-error" id="phone-error">
            {errors.phone}
          </p>
        ) : (
          <span className="sr-only" id="phone-hint">
            Российский номер: 11 цифр, начиная с +7 или 8
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="consultation-project">Интересующий жилой комплекс</label>
        <select
          id="consultation-project"
          name="project"
          value={selectedProject}
          onChange={(event) => {
            setSelectedProject(event.target.value);
            setSuccess(null);
          }}
        >
          <option value="">Помогите определиться</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="button button-accent form-submit">
        Обсудить выбор квартиры <ArrowIcon diagonal />
      </button>
      <p className="form-disclaimer">
        Это демоформа: данные проверяются только в вашем браузере, не сохраняются и никуда не
        отправляются.
      </p>
      <output className="form-result block" aria-live="polite" aria-atomic="true">
        {success !== null && success === selectedProject ? (
          <p>
            <strong>Данные корректны.</strong> Это демонстрация: заявка никуда не отправлялась.
            Можно изменить данные и проверить форму ещё раз.
          </p>
        ) : null}
      </output>
    </form>
  );
}
