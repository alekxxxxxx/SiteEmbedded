/**
 * Название: NEXT_PUBLIC_BRAND_NAME в .env или значение ниже.
 */
export const BRAND_NAME =
  process.env.NEXT_PUBLIC_BRAND_NAME ?? "Vault-Tek";

/** Короткая строчка над логотипом */
export const HERO_KICKER = "Встраиваемые системы и электроника под ключ";

/** Главный оффер (под логотипом) */
export const TAGLINE =
  "От схемы и платы до прошивки и поставки прототипов — один подрядчик, прозрачные сроки и измеримое качество.";

/** Второй абзац в hero */
export const HERO_VALUE =
  "Работаем с промышленностью, IoT и медтехой: проектируем надёжно, документируем как для производства, сопровождаем до серии.";

/** Секция услуг */
export const SECTION_SERVICES_TITLE = "Что делаем";
export const SECTION_SERVICES_LEAD =
  "Полный цикл embedded: можете прийти с идеей или с готовой схемой — доведём до работающих плат и стабильной прошивки.";

export const SERVICES = [
  {
    id: "sch",
    title: "Схемотехника и PCB",
    hint: "Симуляция · импеданс · EMC",
    body: "Разводка с учётом питания, тепла и сертификации. Целостность сигнала, стекап под фабрику, ревизии без сюрпризов в DRC.",
  },
  {
    id: "bom",
    title: "Компоненты и BOM",
    hint: "Сроки · аналоги · EOL",
    body: "Подбор с запасом по поставкам, альтернативы одного класса, прогноз рисков. BOM, который реально купить, а не только собрать в Excel.",
  },
  {
    id: "pcb",
    title: "Производство плат",
    hint: "DFM · панель · контроль",
    body: "Gerber, маска, фаски, тест-точки. Коммуникация с производством на их языке — меньше итераций, быстрее первая партия.",
  },
  {
    id: "fw",
    title: "Прошивка",
    hint: "HAL · протоколы · OTA",
    body: "Драйверы, RTOS или bare-metal по задаче, логирование и обновление в поле. Отладка на железе, профилирование энергопотребления.",
  },
] as const;

/** Принципы работы (отдельная секция) */
export const SECTION_PRINCIPLES_TITLE = "Принципы работы";
export const SECTION_PRINCIPLES_LEAD =
  "Инженерный подход без лишнего шума: фиксируем требования, считаем риски, показываем промежуточные артефакты.";

export const PRINCIPLES = [
  {
    title: "Прозрачность",
    text: "Оценка сроков и узких мест до старта; промежуточные версии схемы, платы и билдов — вы всегда видите состояние проекта.",
  },
  {
    title: "Под производство",
    text: "Документация и DFM с первого дня: не перепроектируем плату перед серией из-за «забытых» допусков.",
  },
  {
    title: "Один контур",
    text: "Железо и прошивка в одной команде: меньше перекладывания ТЗ между подрядчиками и быстрее bring-up.",
  },
  {
    title: "Измерения, не догадки",
    text: "Осциллограф, логический анализатор, тепловизор по необходимости — решения подтверждаем данными, а не «должно работать».",
  },
] as const;

/** Портфолио / кейсы */
export const SECTION_PORTFOLIO_TITLE = "Реализованные проекты";
export const SECTION_PORTFOLIO_LEAD =
  "Промышленные датчики, приводы, силовая электроника и IoT — от прототипа до сопровождения партии.";

export type ProjectWave = "sine" | "pwm" | "ripple";

export const PROJECTS = [
  {
    id: "sensor-node",
    channel: "CH1",
    title: "Узел датчиков для производства",
    tagline: "Сбор данных в шумной среде",
    spec: "STM32G4 · 24-bit АЦП · RS-485 · Modbus",
    wave: "sine" as ProjectWave,
    description:
      "Многоканальный модуль: нормализация сигналов, фильтрация, передача в MES. Разработка схемы, 4-слойная плата, прошивка, калибровка на стенде заказчика.",
    imageSrc: "https://picsum.photos/seed/vaulttek-sensor/720/480",
    imageAlt: "Промышленный модуль датчиков",
  },
  {
    id: "motor-drive",
    channel: "CH2",
    title: "Привод с BLDC",
    tagline: "ШИМ, защита, диагностика",
    spec: "Трёхфазный инвертор · 20 kHz · токовая защита",
    wave: "pwm" as ProjectWave,
    description:
      "От топологии силовой части до алгоритма управления и интерфейса к верхнему уровню. Прототипы, термоизмерения, доработка под серийный корпус.",
    imageSrc: "https://picsum.photos/seed/vaulttek-motor/720/480",
    imageAlt: "Силовая электроника привода",
  },
  {
    id: "power-rail",
    channel: "CH3",
    title: "Цепи питания DC/DC",
    tagline: "Стабильные шины для платы",
    spec: "Buck/Boost · компенсация петли · EMI",
    wave: "ripple" as ProjectWave,
    description:
      "Проектирование петли ОС, выбор ключей и дросселей под КПД и габариты. Измерения пульсаций и пусковых токов, отчёт для согласования с поставщиком питания.",
    imageSrc: "https://picsum.photos/seed/vaulttek-power/720/480",
    imageAlt: "Силовая разводка и DC/DC",
  },
  {
    id: "iot-gateway",
    channel: "CH4",
    title: "IoT-шлюз",
    tagline: "Edge + облако",
    spec: "Ethernet · MQTT · OTA · Secure boot",
    wave: "sine" as ProjectWave,
    description:
      "Связка проводных и беспроводных интерфейсов, удалённое обновление и ограничение поверхности атаки. Поддержка первых полей и эскалация инцидентов.",
    imageSrc: "https://picsum.photos/seed/vaulttek-iot/720/480",
    imageAlt: "Плата IoT-шлюза",
  },
] as const;

export const PROCESS_STEPS = [
  { n: "01", title: "ТЗ и границы", text: "Функции, интерфейсы, среда, сертификация, бюджет и сроки." },
  { n: "02", title: "Схема и BOM", text: "Принципиальная схема, расчёт узлов, первая версия списка компонентов." },
  { n: "03", title: "PCB и DFM", text: "Разводка, стекап, тест-купоны, выпуск gerber под фабрику." },
  { n: "04", title: "Прототип", text: "Партия плат, монтаж, bring-up, правки ревизии при необходимости." },
  { n: "05", title: "Прошивка и приёмка", text: "Релизы FW, документация, передача под серию или сопровождение." },
] as const;

export const SECTION_PROCESS_TITLE = "Как идёт проект";
export const SECTION_PROCESS_LEAD =
  "Понятные этапы и артефакты на выходе каждого шага — без «сделаем как-нибудь потом».";

export const SECTION_CONTACT_TITLE = "Контакты";
export const SECTION_CONTACT_LEAD =
  "Расскажите о задаче — ответим с ориентиром по срокам и составу работ.";

export const PINOUT = [
  { label: "Email", value: "hello@vault-tek.example", href: "mailto:hello@vault-tek.example" },
  { label: "Telegram", value: "@vault_tek", href: "https://t.me/vault_tek" },
  { label: "GitHub", value: "vault-tek", href: "https://github.com/vault-tek" },
  { label: "Телефон", value: "+7 (000) 000-00-00", href: "tel:+70000000000" },
] as const;
