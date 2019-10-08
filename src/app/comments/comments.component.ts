import { Component, OnInit, Input } from '@angular/core';
import { CommentView } from '../_models/comment-view';
import { CommentService } from '../_services/comment-service';
import { BaseComponent } from '../_helpers/base.component';
import { NewComment } from '../_models/new-comment';
import { EditComment } from '../_models/edit-comment';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent extends BaseComponent implements OnInit {

  comments: CommentView[] = [];
  newComment: NewComment = new NewComment();
  commentToEdit: EditComment = new EditComment();
  commentForm: FormGroup;
  recordId: number;
  userId: number;
  page: number = 1;


  constructor(private commentService: CommentService, formBuilder: FormBuilder, private router: ActivatedRoute, private cookies: CookieService) {
    super();
    this.commentForm = formBuilder.group({
      '_text': ['', Validators.required]
    });
    this.recordId = +this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.commentService.getComments(this.recordId, this.page).pipe(takeUntil(this.unsubscribe)).subscribe(comments => {
      this.formatDateOfComments(comments);
      this.isAuthor(comments);
      this.comments = comments;
    });
    

  }

  private isAuthor(comments: CommentView[]) {
    this.userId = +this.cookies.get('id');
    for (let comment of comments) {
      if (comment.userId === this.userId) {
        comment.isAuthor = true;
      }
    }
  }

  onSubmit(comment: NewComment) {
    comment.recordId = +this.recordId;
    this.commentService.addComment(comment).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.commentForm.reset();
      this.ngOnInit();
    });

  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      var current = this.comments.findIndex(comment => comment.id === id);
      this.comments.splice(current, 1);
    });
  }

  private formatDateOfComments(comments: CommentView[]) {
    for (let comment of comments) {
      var pipe = new DatePipe('en-US');
      comment.dateView = pipe.transform(comment.date, 'short');
    }
  }

  public enableEditMode(comment: CommentView): void {
    comment.isEditMode = true;
    this.commentToEdit.text = comment.text;
    this.commentToEdit.id = comment.id;
    this.commentToEdit.userId = this.userId;
  }

  public quitEditMode(comment: CommentView) {
    comment.isEditMode = false;
  }

  public saveChanges() {
    this.commentService.editComment(this.commentToEdit).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      var edited = this.comments.find(c => c.id == this.commentToEdit.id);
      edited.text = this.commentToEdit.text;
      edited.isEditMode = false;
    });
  }

  onScroll() {
    this.page ++;
    console.log(this.page);
    this.comments = this.comments.concat(this.comments);
    this.commentService.getComments(this.recordId, this.page).pipe(takeUntil(this.unsubscribe)).subscribe(comments => {
      this.formatDateOfComments(comments);
      this.isAuthor(comments);
      this.comments = this.comments.concat(comments);
    });
  }
}
