import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  standalone: true,
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    DatePipe,
    MatFormField,
    MatLabel,
    MatIcon,
    MatSlideToggle
  ],
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userapi: UserService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userapi.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  refreshUsersTable(): void {
    this.userapi.getUsers().subscribe((data: User[]) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}