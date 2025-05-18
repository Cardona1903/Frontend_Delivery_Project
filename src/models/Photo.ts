export interface Photo {
    id?: number;
    issue_id: number;
    image_url: string;
    caption?: string; // Opcional
    taken_at: Date;
}