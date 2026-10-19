import Image from "next/image";
import { Header } from "@/components/header";
import { ArrowIcon, Brand } from "@/components/icons";
import { ProjectExplorer } from "@/components/project-explorer";
import { ConsultationForm } from "@/components/consultation-form";
import { SelectionProvider } from "@/components/selection-provider";
import { Reveal } from "@/components/reveal";
import { navigation } from "@/data/projects";

const principles = [
  {
    title: "Дворы без машин",
    text: "Только прогулки, игры и встречи с соседями. Автомобили остаются в подземном паркинге, а двор принадлежит жителям.",
  },
  {
    title: "Инфраструктура рядом",
    text: "За свежим хлебом, на тренировку или в детский сад — пешком. Всё, что нужно каждый день, становится частью квартала.",
  },
  {
    title: "Архитектура на годы",
    text: "Натуральные фактуры, сдержанные цвета и выразительные силуэты. Дома, которые вписываются в город и сохраняют характер.",
  },
  {
    title: "Продуманные планировки",
    text: "Больше света, полезных метров и свободы. Кухни-гостиные, места для хранения и комнаты, которые меняются вместе с вами.",
  },
];

export default function Home() {
  return (
    <SelectionProvider>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image">
            <Image
              src="/images/park-line.webp"
              alt="Современный жилой квартал с терракотовыми башнями и зелёным парком"
              fill
              preload
              sizes="100vw"
              quality={85}
            />
          </div>
          <div className="hero-scrim" />
          <div className="page-container hero-content">
            <div className="hero-heading">
              <h1 id="hero-title">
                Создаём новые
                <br className="desktop-break" /> точки притяжения
              </h1>
              <p>
                Жилые кварталы, в которых архитектура,
                <br className="desktop-break" /> природа и город становятся частью вашей жизни
              </p>
              <div className="hero-actions">
                <a href="#projects" className="button button-light">
                  Смотреть проекты <ArrowIcon diagonal />
                </a>
                <a href="#about" className="hero-secondary">
                  О девелопере
                </a>
              </div>
            </div>
            <div className="hero-caption">
              <span className="caption-line" />
              <div>
                <span>ЖК «Парк Линия»</span>
                <span>Бизнес-класс · Москва</span>
              </div>
              <a href="#projects" aria-label="Перейти к жилым комплексам">
                <ArrowIcon />
              </a>
            </div>
            <div className="hero-bottom">
              <span>Архитектура вашей жизни</span>
              <span>В городе. В природе. Дома.</span>
            </div>
          </div>
        </section>

        <section
          className="stats page-container"
          aria-label="Масштаб компании — демонстрационные показатели"
        >
          <p className="stats-intro" data-reveal>
            Большие планы. <br />
            Реальные пространства <br />
            для жизни.
          </p>
          <dl className="stats-grid">
            <div data-reveal>
              <dt>лет работы</dt>
              <dd>
                12<span>лет</span>
              </dd>
            </div>
            <div data-reveal>
              <dt>жилых кварталов</dt>
              <dd>8</dd>
            </div>
            <div data-reveal>
              <dt>построено</dt>
              <dd>
                240 000<span>м²</span>
              </dd>
            </div>
          </dl>
        </section>

        <section
          id="projects"
          className="projects-section page-container section-space"
          aria-labelledby="projects-title"
        >
          <div className="section-heading" data-reveal>
            <h2 id="projects-title">
              Место, которое
              <br />
              вам близко
            </h2>
            <p>
              Наши жилые комплексы. <br />
              Разные по характеру, одинаково
              <br className="desktop-break" /> внимательные к вашей жизни.
            </p>
          </div>
          <ProjectExplorer />
          <p className="catalog-note">
            Все проекты, сроки сдачи и цены на этой странице — демонстрационные.
          </p>
        </section>

        <section
          id="approach"
          className="approach-section section-space"
          aria-labelledby="approach-title"
        >
          <div className="page-container">
            <div className="section-heading approach-heading" data-reveal>
              <h2 id="approach-title">Продумано за пределами квартиры</h2>
              <p>
                Дом не заканчивается за вашей дверью. <br />
                Мы думаем обо всём, что вокруг.
              </p>
            </div>
            <div className="approach-grid">
              <figure className="approach-photo" data-reveal>
                <div className="approach-image">
                  <Image
                    src="/images/courtyard.webp"
                    alt="Зелёный двор без машин с деревьями, злаками, прогулочными дорожками и деревянными скамьями"
                    fill
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </div>
                <figcaption>
                  <span>Пространство для повседневного счастья</span>
                  <span>Двор ЖК «Парк Линия»</span>
                </figcaption>
              </figure>
              <div className="principles">
                {principles.map((principle) => (
                  <div className="principle" data-reveal key={principle.title}>
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-photo">
            <Image
              src="/images/height.webp"
              alt="Чёткий ритм окон и фасадов современной высотной архитектуры"
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
            />
          </div>
          <div className="about-copy" data-reveal>
            <h2 id="about-title">
              Смотрим шире.
              <br />
              Строим для жизни.
            </h2>
            <p className="about-lead">
              От первого эскиза до дерева у вашего подъезда — отвечаем за квартал целиком.
            </p>
            <p>
              В ГРАНЬ выбираем участки с перспективой, проектируем удобные маршруты, строим дома и
              создаём среду вокруг. На каждом этапе задаём себе один вопрос: как здесь будет жить
              человеку?
            </p>
            <div className="about-values">
              <span>Полный цикл девелопмента</span>
              <span>Внимание к каждой детали</span>
            </div>
            <a href="#contacts" className="about-link">
              Познакомиться ближе <ArrowIcon diagonal />
            </a>
          </div>
        </section>

        <section
          id="contacts"
          className="consultation-section page-container section-space"
          aria-labelledby="consultation-title"
        >
          <div className="consultation-copy" data-reveal>
            <h2 id="consultation-title">
              Найдём ваше
              <br />
              место в городе
            </h2>
            <p>
              Расскажите, что для вас важно.
              <br />
              Поможем сравнить кварталы, разобраться
              <br className="desktop-break" /> в планировках и выбрать своё.
            </p>
            <div className="consultation-details">
              <span>В вашем ритме</span>
              <p>
                Без спешки и сложных терминов.
                <br />С вниманием к вашим планам.
              </p>
            </div>
          </div>
          <ConsultationForm />
        </section>
      </main>

      <footer className="footer">
        <div className="page-container">
          <div className="footer-top">
            <Brand footer />
            <nav aria-label="Навигация в подвале">
              {navigation.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="#top" className="back-top">
              Наверх <ArrowIcon diagonal />
            </a>
          </div>
          <div className="footer-bottom">
            <p>© {2026} ГРАНЬ Девелопмент</p>
            <p>Демонстрационный сайт. Компания, проекты, цены и показатели вымышлены.</p>
            <span>Создаём среду для жизни</span>
          </div>
        </div>
      </footer>
      <Reveal />
    </SelectionProvider>
  );
}
