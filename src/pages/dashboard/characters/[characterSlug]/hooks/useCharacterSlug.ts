import { useRouter } from 'next/router';

export const useCharacterSlug = () => {
  const router = useRouter();
  let { characterSlug } = router.query;

  if (characterSlug) characterSlug = characterSlug as string;

  return characterSlug;
};
