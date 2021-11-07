export enum ClassType {
    Gladiator = 1,
    Druid,
    Warrior,
    Shaman,
    Mage,
    Hunter,
    Assassin,
    Warlock,
}

export function extractJobIdFromResourceId(resourceId: string): number {
  return Number(resourceId.replace('/api/jobs/', ''));
}
