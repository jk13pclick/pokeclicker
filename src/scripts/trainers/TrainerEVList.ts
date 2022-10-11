class TrainerEVList {

  public static list = new Set();

  public static generateList() {
      const pList = new Set();
      const notIncluded = new Set();
      Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
          dungeon.enemyList.forEach(p => {
              if (p instanceof DungeonTrainer) {
                  p.team.forEach(x => {
                      pList.add(x.name);
                  });
              }
          });
      });
      Object.entries(GymList).forEach(([x, gym]) => {
          gym.pokemons.forEach(p => {
              pList.add(p.name);
          });
      });
      App.game.farming.berryData.forEach(x => {
          x.wander.forEach(wander => {
              pList.add(wander);
          });
      });
      //TODO: Shopmons?
      Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
          dungeon.allAvailablePokemon().forEach(p => {
              notIncluded.add(p);
          });
      });
      Routes.regionRoutes.forEach(x => {
          RouteHelper.getAvailablePokemonList(x.number,x.region, true).forEach(e => {
              notIncluded.add(e);
          });
      });

      const evListFiltered = Array.from(pList).filter(pokemon => !(Array.from(notIncluded).includes(pokemon)));
      //const evListSorted = evListFiltered.sort((a,b) => pokemonMap[a].id - pokemonMap[b].id);
      TrainerEVList.list = new Set(evListFiltered);
  }
}
