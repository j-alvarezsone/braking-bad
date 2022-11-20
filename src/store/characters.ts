import { reactive } from 'vue';
import type { Character } from '../characters/interfaces/Character';
import breakingBadApi from '../api/breakingBadApi';

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessages: string | null;
  };

  // Methods
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[] | string) => void;
  loadCharactersFailed: (error: string) => void;
}

const characterStore = reactive<Store>({
  characters: {
    list: [],
    count: 0,
    isLoading: true,
    hasError: false,
    errorMessages: null,
  },
  // Methods
  async startLoadingCharacters() {
    const { data } = await breakingBadApi.get<Character[]>('/characters');
    characterStore.loadedCharacters(data);
  },
  loadedCharacters(data) {
    if (typeof data === 'string') {
      return this.loadCharactersFailed('The response is not array of characters');
    }
    const characters = data.filter((character) => ![14, 17, 39].includes(character.char_id));
    this.characters = {
      count: data.length,
      errorMessages: null,
      hasError: false,
      isLoading: false,
      list: characters,
    };
  },
  loadCharactersFailed(error) {
    this.characters = {
      count: 0,
      errorMessages: error,
      hasError: true,
      isLoading: false,
      list: [],
    };
  },
});

characterStore.startLoadingCharacters();

export default characterStore;
