import { continentStore, ContinentStore } from './continent.store';
import { ContinentRepository } from './continent.repository';

class ContinentService {
  constructor(private continentStore: ContinentStore) {
  }

  fetchAllContinents() {
    this.continentStore.setLoading(true);
    return ContinentRepository.findAll()
      .then(continents => {
        this.continentStore.set(continents);
        this.continentStore.setLoading(false);
        console.debug('Continents Loaded', continents);
      });
  }
}

export const continentService = new ContinentService(continentStore);
