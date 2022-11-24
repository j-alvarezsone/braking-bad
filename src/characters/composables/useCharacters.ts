import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { Character } from '../interfaces/Character';
import breakingBadApi from '../../api/breakingBadApi';

const characters = ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length > 0) {
    return characters.value;
  }

  const { data } = await breakingBadApi.get<Character[]>('/characters');
  return data;
};

const loadCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data.filter((character) => ![14, 17, 39].includes(character.char_id));
};

const useCharacters = () => {
  const { isLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
    onSuccess: loadCharacters,
  });

  return {
    // Properties
    characters,
    isLoading,
    hasError,
    errorMessage,
    // Getters
    count: computed(() => characters.value.length),
    // Methods
  };
};

export default useCharacters;
