export class CommentView {
    id: number;
    text: string;
    byUser: string;
    userId:string;
    dateView: string;
    date: Date;
    isAuthor: boolean;
    isEditMode: boolean = false;
}
