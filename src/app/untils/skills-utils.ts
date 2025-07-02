export function addSkillToList(
  skillInput: string,
  skillsList: { name: string }[],
  setSkillsList: (skills: { name: string }[]) => void
): void {
  const skillInputs = skillInput.split(';');
  
  for (const skillInput of skillInputs) {
    const trimmed = skillInput.trim();
    if (
      trimmed &&
      !skillsList.some(skill => skill.name === trimmed)
    ) {
      skillsList.push({ name: trimmed });
      setSkillsList([...skillsList]); 
    }
  }
}

export function removeSkillFromList(
  skill: string,
  skillsList: { name: string }[],
  setSkillsList: (skills: { name: string }[]) => void
): void {
  const updatedSkills = skillsList.filter(s => s.name !== skill);
  setSkillsList(updatedSkills);
}
