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

// Sample summaries - replace these with your actual OpenStax summaries
export const SAMPLE_SUMMARIES: TextSummary[] = [
  // Standard summaries (6)
  {
    id: 'psychology-1-standard',
    title: 'Introduction to Psychology (Standard)',
    text: `Psychology is the scientific study of mind and behavior. The word "psychology" comes from the Greek words "psyche," meaning life, and "logos," meaning explanation. Psychology is a popular major for students, a popular topic in the public media, and a part of our everyday lives. Television shows such as Criminal Minds and Law & Order: Special Victims Unit portray the work of forensic psychologists. Movies such as Cruel Intentions and Silence of the Lambs create compelling stories with psychological undertones. Numerous popular psychology books and magazines published each year promise to improve readers' lives through the application of psychological principles.`,
    simplified: false
  },
  {
    id: 'biology-1-standard',
    title: 'Introduction to Biology (Standard)',
    text: `Biology is the science that studies living organisms and their interactions with one another and their environments. Science attempts to describe and understand the nature of the universe in whole or in part by rational means. Science has many fields. Those fields related to the physical world and its phenomena are considered natural sciences. Biology, the study of living things, is a natural science. Modern biology is a relatively recent field, but humans have been studying living things throughout history. The invention of the microscope in the late 1500s opened an entire world and led to the discovery of cells and microorganisms. Modern biology really began in the nineteenth century with Mendel's discovery of genetics and Darwin's evolution theory.`,
    simplified: false
  },
  {
    id: 'chemistry-1-standard',
    title: 'Introduction to Chemistry (Standard)',
    text: `Chemistry is the study of matter, its composition, and the changes it undergoes. During this experiment-based presentation, we will explore basic chemical principles by performing a series of demonstrations that highlight these principles. Many of the changes chemists study result in products that are either useful for humans or yield information that helps us understand complicated natural processes. One of the wonders of chemistry is that we can probe the molecular basis of life, environmental problems, and the properties of materials. Chemistry is concerned with the composition, properties, and structure of matter and the changes that matter undergoes.`,
    simplified: false
  },
  {
    id: 'physics-1-standard',
    title: 'Introduction to Physics (Standard)',
    text: `Physics is the most fundamental of all sciences. From the smallest subatomic particles to the vastness of cosmic expansion, it tries to explain everything around us. Physics seeks to explain the forces that shape our world. These forces include gravity, which causes planets to orbit stars and objects to fall to the Earth. Physics also explains forces we cannot see. The electromagnetic force binds atoms together and gives materials their strength. This force also powers our technology, from smartphones to electric cars. Nuclear forces hold together the nuclei of atoms and enable nuclear power and weapons. Understanding these forces has transformed our world.`,
    simplified: false
  },
  {
    id: 'economics-1-standard',
    title: 'Introduction to Economics (Standard)',
    text: `Economics is a social science concerned with the factors that determine the production, distribution, and consumption of goods and services. The term economics comes from the Ancient Greek word oikonomia, which means "management of a household." The field looks at how individuals, businesses, governments, and nations make choices on allocating resources to satisfy their wants and needs, and tries to determine how these groups should organize and coordinate efforts to achieve maximum output. Economic analysis often progresses through deductive processes, including mathematical logic, where the implications of specific human activities are considered in a framework of interrelated concepts.`,
    simplified: false
  },
  {
    id: 'history-1-standard',
    title: 'Introduction to World History (Standard)',
    text: `History provides us with the context to understand how current events, societal structures, and political systems came to be. By studying the past, historians attempt to reconstruct and interpret what happened and why it occurred through analyzing primary sources from the time period under examination. These primary sources might include written documents, archaeological artifacts, oral histories, or other surviving evidence. Modern historical methodology emphasizes examining these sources critically, understanding the biases and contexts of their creators, and recognizing that our interpretations of the past are influenced by our own contemporary perspectives. Through this analytical process, historians seek to explain cause and effect relationships throughout human experience.`,
    simplified: false
  },
  
  // Simplified summaries (6)
  {
    id: 'psychology-1-simplified',
    title: 'Introduction to Psychology (Simplified)',
    text: `Psychology studies how the mind works and why people behave in certain ways. The word comes from Greek terms for "mind" and "study." Many students choose to study psychology, and we often see psychology topics in media and daily life. TV shows like Criminal Minds show forensic psychologists at work. Movies often use psychological themes in their stories. Many books and magazines about psychology are published each year, promising to help readers improve their lives by using psychological concepts.`,
    simplified: true
  },
  {
    id: 'biology-1-simplified',
    title: 'Introduction to Biology (Simplified)',
    text: `Biology is the study of living things and how they interact with their surroundings. It's part of natural science, which tries to explain the physical world through careful study. People have always studied living things, but modern biology really began when microscopes were invented in the 1500s. This allowed scientists to discover cells and tiny organisms. Two major advances came in the 1800s: Mendel discovered the basic rules of genetics, and Darwin developed the theory of evolution. These discoveries helped form the foundation of modern biology.`,
    simplified: true
  },
  {
    id: 'chemistry-1-simplified',
    title: 'Introduction to Chemistry (Simplified)',
    text: `Chemistry is the study of matter—what things are made of and how they change. Chemists do experiments to learn about the basic properties of matter. Many chemical discoveries help humans by creating useful products or helping us understand natural processes. Chemistry lets us study life at the molecular level, solve environmental problems, and develop new materials. The field focuses on what matter is made of, how it behaves, how atoms connect to form materials, and what happens when materials transform into other substances.`,
    simplified: true
  },
  {
    id: 'physics-1-simplified',
    title: 'Introduction to Physics (Simplified)',
    text: `Physics tries to explain everything in our world, from tiny particles to the entire universe. It studies the forces that shape our world, like gravity, which makes planets orbit stars and objects fall to Earth. Physics also explains forces we can't see. Electromagnetic force holds atoms together and makes materials strong. This force also powers our devices like phones and electric cars. Nuclear forces hold the centers of atoms together and make nuclear power possible. Learning about these forces has changed our world in many ways.`,
    simplified: true
  },
  {
    id: 'economics-1-simplified',
    title: 'Introduction to Economics (Simplified)',
    text: `Economics studies how people, businesses, and governments make choices about using limited resources. The word "economics" comes from Greek words meaning "household management." This field looks at how we produce, distribute, and use goods and services. Economics tries to figure out how different groups should work together to meet their needs efficiently. Economists often use logical thinking and math to understand how specific actions affect the bigger economic picture. They study concepts like supply and demand, prices, and market behavior.`,
    simplified: true
  },
  {
    id: 'history-1-simplified',
    title: 'Introduction to World History (Simplified)',
    text: `History helps us understand why things are the way they are today. Historians study the past by looking at evidence from that time, like written documents, artifacts, and stories passed down. They carefully examine these sources, keeping in mind that the people who created them had their own views and biases. Historians also recognize that our own modern views can affect how we understand the past. Through this careful study, historians try to explain what happened in the past and why, showing how one event led to another throughout human history.`,
    simplified: true
  }
];