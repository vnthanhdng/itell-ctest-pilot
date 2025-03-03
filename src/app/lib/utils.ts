import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomTestId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface TextSummary {
  id: string;
  title: string;
  text: string;
  simplified: boolean;
}

export const SAMPLE_SUMMARIES: TextSummary[] = [
  // Standard summaries (6)
  {
    id: "biology-2e",
    title: "Biology",
    text: "Biology is the scientific study of life across multiple levels of organization. All living organisms share characteristics including cellular organization, reproduction, metabolism, growth, adaptation, response to stimuli, and evolution. Cells are the fundamental unit of life, existing as prokaryotes (bacteria and archaea) or eukaryotes (animals, plants, fungi, and protists). Biological macromolecules—proteins, nucleic acids, carbohydrates, and lipids—form the structural and functional components of cells. DNA contains genetic information that directs protein synthesis through RNA intermediaries. Cellular processes include energy transformation through photosynthesis and cellular respiration. Organisms maintain homeostasis through various regulatory mechanisms. Ecology examines interactions among organisms and their environment, while evolution through natural selection explains biodiversity and adaptation. Modern biology employs diverse research methodologies to understand living systems at molecular, cellular, organismal, and ecological levels.",
    simplified: false,
  },
    {
      id: "chemistry-2e",
      title: "Chemistry",
      text: "Chemistry examines matter's composition, structure, properties, and transformations. Atoms, consisting of protons, neutrons, and electrons, form the fundamental building blocks of all substances. Elements are organized in the periodic table based on atomic number and properties. Chemical bonds—ionic, covalent, and metallic—form through electron interactions, creating compounds with distinct characteristics. Chemical reactions involve breaking and forming bonds, governed by thermodynamic principles that determine spontaneity and energy changes. Reaction rates depend on concentration, temperature, and catalysts. Solutions exhibit properties dependent on solute-solvent interactions. Acid-base chemistry involves proton transfer reactions, while redox chemistry involves electron transfers. Organic chemistry focuses on carbon-containing compounds organized by functional groups, essential for biological systems. Analytical techniques such as spectroscopy reveal molecular structures. Chemistry applications span medicine, materials science, energy production, and environmental remediation, demonstrating the discipline's fundamental importance to scientific advancement and technological innovation.",
      simplified: false,
    },
    {
      id: "anatomy-and-physiology-2e",
      title: "Anatomy and Physiology",
      text: "Human anatomy and physiology examines the structural and functional relationships within the body's hierarchical organization. From cells to tissues to organs to systems, each level contributes to maintaining homeostasis. The integumentary system forms a protective barrier, while skeletal and muscular systems enable movement and support. Neural and endocrine systems integrate rapid and long-term regulation, respectively. The cardiovascular system distributes oxygen and nutrients via blood vessels powered by the heart. Respiratory structures facilitate gas exchange, while digestive organs break down food for absorption. The urinary system filters blood and eliminates waste, maintaining fluid and electrolyte balance. Lymphatic components defend against pathogens, complementing immune responses. Reproductive structures ensure species continuation through hormone regulation and gamete production. All systems demonstrate remarkable integration through feedback mechanisms that maintain internal stability despite environmental changes. Understanding these intricate relationships illuminates both normal function and disease processes, forming the foundation of medical science and clinical practice.",
      simplified: false,
    },
    {
      id: "psychology-2e",
      title: "Psychology",
      text: "Psychology examines human behavior and mental processes through multiple theoretical perspectives and scientific methodologies. Biological foundations include neural transmission, brain structures, and genetic influences on behavior. Sensation and perception involve receiving and interpreting environmental stimuli, while consciousness encompasses awareness states including sleep and altered consciousness. Learning occurs through classical and operant conditioning as well as cognitive processes, with memory involving encoding, storage, and retrieval mechanisms. Developmental psychology tracks physical, cognitive, and social changes across the lifespan from prenatal development through aging. Personality theories explain individual differences through traits, psychodynamic processes, and social-cognitive factors. Social psychology examines interpersonal influence through conformity, obedience, and group dynamics. Psychological disorders represent maladaptive patterns of thought, emotion, and behavior addressed through various therapeutic approaches. Research methods including experiments, correlational studies, and case studies establish psychology's empirical foundation, while applications span clinical, educational, organizational, and health contexts demonstrating the discipline's relevance to human welfare.",
      simplified: false,
    },
    {
      id: "american-government-3e",
      title: "American Government",
      text: "American government operates as a constitutional republic with democratic principles, balancing power between federal and state authorities. The Constitution establishes three branches—legislative, executive, and judicial—with checks and balances preventing power concentration. Civil liberties protect individual freedoms while civil rights ensure equal treatment. Federalism distributes power between national and state governments, creating policy laboratories while addressing local concerns. Political participation occurs through elections, parties, interest groups, and media influence, with voting rights expanding throughout history despite contemporary challenges. Congress creates laws, the president implements policies, and courts interpret constitutionality. Bureaucracy administers regulations while being accountable to elected officials. Economic policy balances taxation and spending, while foreign policy utilizes diplomatic, economic, and military tools. Ongoing tensions between limited government, equality, liberty, and security reflect American democracy's dynamic nature, continuously adapting to technological, demographic, and ideological changes while maintaining constitutional principles of representation, rights, and rule of law.",
      simplified: false,
    },
    {
      id: "introduction-sociology-3e",
      title: "Sociology",
      text: "Sociology examines human social behavior at micro and macro levels, analyzing interactions, groups, institutions, and cultural patterns. Major theoretical perspectives—functionalism, conflict theory, and symbolic interactionism—provide frameworks for understanding social phenomena. Research methods including surveys, experiments, and field research establish sociology's scientific foundation. Culture encompasses values, norms, and symbols that guide behavior within societies. Socialization processes integrate individuals into cultural contexts throughout the life course. Social stratification creates hierarchies based on class, race, gender, and other factors, producing persistent inequality. Institutions like family, education, religion, and government maintain social stability while sometimes reinforcing disparities. Demography studies population composition and dynamics, while urbanization examines spatial organization of human settlements. Globalization connects societies through economic, political, and cultural exchange, producing both integration and resistance. Collective behavior and social movements challenge existing structures and drive social change. Sociological insights inform policy addressing poverty, discrimination, public health, and environmental sustainability, demonstrating the discipline's relevance to social problems and human well-being.",
      simplified: false,
    },
  
  // Simplified summaries (6)
  {
    id: "us-history",
    title: "U.S. History",
    text: "American history began with Native peoples living across the continent for thousands of years. European colonists arrived in the 1500s and 1600s, and thirteen British colonies later fought for independence, creating the United States in 1776. The new country expanded westward but faced conflicts over slavery that led to the Civil War (1861-1865). After the war, industry grew rapidly and many immigrants came seeking better lives. The early 1900s saw social reforms, World War I, and the Great Depression. World War II made America a global power during the Cold War with the Soviet Union. The Civil Rights Movement fought for equality for Black Americans and other minorities. Recent decades brought technological changes, terrorism challenges, economic shifts, and debates about America's role in the world. Throughout its history, America has worked to fulfill the promise of democracy and equal rights for all people, though many challenges remain.",
    simplified: true,
  },
    {
      id: "concepts-biology",
      title: "Concepts of Biology",
      text: "Living things share key features: they are made of cells, use energy, respond to their surroundings, grow, reproduce, and change over time. Cells are the basic units of life, containing DNA that holds instructions for making proteins. Plants use sunlight to make food through photosynthesis, while animals must eat other organisms. Living things are organized from small to large parts - cells form tissues, tissues form organs, and organs work together in systems. Organisms pass traits to offspring through genes, which can change through mutations, creating new traits. Over many generations, species change through natural selection as organisms with helpful traits survive better. All living things are connected through ecosystems, where they depend on each other and their environment. Humans impact nature through pollution, habitat loss, and climate change, making conservation important for protecting Earth's biodiversity.",
      simplified: true,
    },
    {
      id: "business-ethics",
      title: "Business Ethics",
      text: "Business ethics looks at what's right and wrong in business decisions. Companies must balance making money with treating workers, customers, communities, and the environment fairly. Ethical issues arise in many areas like marketing products honestly, treating workers well, protecting customer information, and preventing pollution. Corporate social responsibility means going beyond legal requirements to help society. Business leaders set the tone for ethical behavior throughout their companies. When working globally, companies face different cultural values and rules in different countries. While unethical choices might bring quick profits, good ethics builds trust and a strong reputation over time. Companies often create codes of conduct and training programs to guide employees. When facing difficult choices, businesses can use decision-making frameworks that consider how their actions affect everyone involved. Ethical business practices contribute to sustainable economic growth and social well-being.",
      simplified: true,
    },
    {
      id: "introduction-anthropology",
      title: "Introduction to Anthropology",
      text: "Anthropology studies what makes us human by examining people across time and space. Physical anthropology looks at human evolution and how our bodies changed over millions of years by studying fossils and comparing humans with other primates. Archaeology uncovers remains of ancient societies to learn how people lived long ago by examining tools, buildings, and other objects they left behind. Cultural anthropology explores the different ways people live around the world today, including their beliefs, family systems, and social rules. Linguistic anthropology studies language and how it shapes how we see the world. Anthropologists often live with the people they study to better understand their lives. Through their research, anthropologists have shown that while humans differ in many ways, we share common needs and abilities. Anthropology helps us understand human diversity and appreciate different ways of life while showing how biology, environment, and culture work together to shape the human experience.",
      simplified: false,
    },
    {
      id: "introduction-philosophy",
      title: "Introduction to Philosophy",
      text: "Philosophy asks big questions about existence, knowledge, values, reason, and language. Unlike science, which tests theories with experiments, philosophy uses logical arguments to explore ideas. Metaphysics considers what's real and how things exist, while epistemology asks how we know things and what counts as knowledge. Ethics explores right and wrong actions and how we should live. Political philosophy examines how society should be organized and what makes governments fair. Logic studies how to reason correctly and spot flawed arguments. Throughout history, philosophers from different cultures have offered various answers to life's big questions. While philosophy rarely gives final answers, it helps us think more clearly, question our assumptions, and develop well-reasoned beliefs about ourselves and our world. Philosophical thinking encourages us to examine the foundations of our beliefs and to consider alternative perspectives.",
      simplified: true,
    },
    {
      id: "organizational-behavior",
      title: "Organizational Behavior",
      text: "Organizational behavior studies how people act in workplaces and how their actions affect the organization. Individual differences in personality, values, and abilities influence how people perform their jobs. Motivation theories explain what drives people to work hard, whether it's rewards, meaningful work, or growth opportunities. Teams can accomplish more than individuals when they communicate well and have clear goals. Leaders guide others through different styles, from giving direct orders to involving everyone in decisions. Workplace culture includes shared values and expectations that shape behavior. Organizations change over time to adapt to new technologies and market demands. Effective communication helps solve problems and build relationships. Managing diversity in the workplace leads to better decisions and innovation. Job satisfaction affects how long employees stay and how well they perform. Understanding these patterns helps create better workplaces where both people and organizations can succeed.",
      simplified: true,
    }
];