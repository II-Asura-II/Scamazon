const Capitalise = (word: string): string => {
  return (
    word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase()
  );
};

export default Capitalise;
