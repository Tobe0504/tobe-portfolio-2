export const gradeHandler = (score: number) => {
  if (score >= 70) {
    return "A";
  } else if (score < 70 && score >= 60) {
    return "B";
  } else if (score < 60 && score >= 55) {
    return "C";
  } else if (score < 55 && score >= 50) {
    return "D";
  } else if (score < 50 && score >= 40) {
    return "E";
  } else if (score < 40) {
    return "F";
  } else return "No grade found";
};
