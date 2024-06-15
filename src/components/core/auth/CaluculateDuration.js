export const CaluculateDuration = (course) => {
  let count = 0;
  if (Array.isArray(course.Section)) {
    for (let i = 0; i < course.Section.length; i++) {
      if (Array.isArray(course.Section[i].subSection)) {
        for (let j = 0; j < course.Section[i].subSection.length; j++) {
          count += Number(course.Section[i].subSection[j].duration);
        }
      }
    }
  }

  const hours = Math.floor(count / 3600);
  const minutes = Math.floor((count % 3600) / 60);
  const seconds = count % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
};
