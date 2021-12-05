export class BossFactory {
    static extractId(resourceId: string): number {
        return Number(resourceId.replace('/api/boss/', ''));
    }
}
