import { ref, computed } from 'vue';
import type { Character } from '../interfaces/Character';
import breakingBadApi from '../../api/breakingBadApi';
import { useQuery } from '@tanstack/vue-query';
// const characterSet = {}

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) return characterSet.value[id];

  try {
    const { data } = await breakingBadApi.get<Character[]>(`/characters/${id}`);
    if (data.length > 0) return data[0];

    throw new Error(`Character with id ${id} not found`);
  } catch (error: any) {
    throw new Error(error);
  }
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[character.char_id] = character;
};

const loadedWithError = (error: string) => {
  hasError.value = true;
  errorMessage.value = error;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    onSuccess: loadedCharacter,
    onError: loadedWithError,
  });
  return {
    // Properties
    list: characterSet.value,
    hasError,
    errorMessage,
    isLoading,
    // Getters
    character: computed<Character | null>(() => characterSet.value[id]),
    // Methods
  };
};

export default useCharacter;
