import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-popup',
  template: `
    <h2 mat-dialog-title>Delete Todo</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete the todo?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class ConfirmDeletePopupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
