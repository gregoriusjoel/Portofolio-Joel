// About page data
export const skills = [
  { name: "Python", percentage: 80 },
  { name: "JavaScript", percentage: 80 },
  { name: "React JS", percentage: 75 },
  { name: "TypeScript", percentage: 75 },
  { name: "Laravel", percentage: 70 },
  { name: "Golang", percentage: 50 },
  { name: "Flutter", percentage: 70 },
  { name: "MySQL", percentage: 80 },
  { name: "Tailwind CSS", percentage: 85 },
  { name: "UI/UX Design", percentage: 80 },
  { name: "Responsive Web", percentage: 95 }
];

export const getTools = (t) => [
  { name: "VS Code", icon: "bx-code-alt", desc: t('codeEditor') },
  { name: "Figma", icon: "bxl-figma", desc: t('designTool') },
  { name: "Git & GitHub", icon: "bxl-git", desc: t('versionControl') },
  { name: "MySQL", icon: "bx-data", desc: t('database') }
];