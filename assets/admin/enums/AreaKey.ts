// eslint-disable-next-line @typescript-eslint/no-unused-vars
export enum AreaKey {
  None,
  // C1
  SabadaRainforest,
  ChiwawaGorge,
  BataDesert,
  BababoCoast,
  JujuleVolcano,
  SinbadRainforest,
  TotoPlain,
  CoboCoast,
  // C2
  HoruFjord,
  TintinIceCave,
  TovanaSnowland,
  PukeGlacier,
  WarryWoodland,
  DodoriSnowMountain,
  SinvasaWoodland,
  HoriFjord,
  // C3
  TotoriCoast,
  GirkaDesert,
  ParoOasis,
  KarusaSaltLake,
  ThousandNeedles,
  GiantRockMountain,
  CoraGobi,
  PapetoOasis,
  GyseanSaltLake,
  // C3
  HeroHill
}

export type AreaKeyType = keyof typeof AreaKey;

export const getAreaKey = (key: string) => {
  return AreaKey[key as keyof typeof AreaKey];
};



export const AreaNames: string[] = [];
AreaNames[AreaKey.SabadaRainforest] = 'Sabada Rainforest';
AreaNames[AreaKey.ChiwawaGorge] = 'Chiwawa Gorge';
AreaNames[AreaKey.BataDesert] = 'Bata Desert';
AreaNames[AreaKey.BababoCoast] = 'Bababo Coast';
AreaNames[AreaKey.JujuleVolcano] = 'Jujule Volcano';
AreaNames[AreaKey.SinbadRainforest] = 'Sinbad Rainforest';
AreaNames[AreaKey.TotoPlain] = 'Toto Plain';
AreaNames[AreaKey.CoboCoast] = 'Cobo Coast';
AreaNames[AreaKey.HoruFjord] = 'Horu Fjord';
AreaNames[AreaKey.TintinIceCave] = 'Tintin Ice Cave';
AreaNames[AreaKey.TovanaSnowland] = 'Tovana Snowland';
AreaNames[AreaKey.PukeGlacier] = 'Puke Glacier';
AreaNames[AreaKey.WarryWoodland] = 'Warry Woodland';
AreaNames[AreaKey.DodoriSnowMountain] = 'Dodori Snow Mountain';
AreaNames[AreaKey.SinvasaWoodland] = 'Sinvasa Woodland';
AreaNames[AreaKey.HoriFjord] = 'Hori Fjord';
AreaNames[AreaKey.TotoriCoast] = 'Totori Coast';
AreaNames[AreaKey.GirkaDesert] = 'Girka Desert';
AreaNames[AreaKey.ParoOasis] = 'Paro Oasis';
AreaNames[AreaKey.KarusaSaltLake] = 'Karusa Salt Lake';
AreaNames[AreaKey.ThousandNeedles] = 'Thousand Needles';
AreaNames[AreaKey.GiantRockMountain] = 'Giant Rock Mountain';
AreaNames[AreaKey.CoraGobi] = 'Cora Gobi';
AreaNames[AreaKey.PapetoOasis] = 'Papeto Oasis';
AreaNames[AreaKey.GyseanSaltLake] = 'Gysean Salt Lake';
