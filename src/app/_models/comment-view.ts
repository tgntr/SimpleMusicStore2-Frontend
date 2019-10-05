export class CommentView {
    id: number;
    text: string;
    byUser: string;
    userId:number;
    dateView: string;
    date: Date;
    isAuthor: boolean;
    isEditMode: boolean = false;
}
