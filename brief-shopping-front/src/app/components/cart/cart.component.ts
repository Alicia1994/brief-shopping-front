import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() user?: User;
  @Output() idToDelete = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  addNewItem(value: string) {
  }

  deleteUser(id:any) {
    confirm('Voulez supprimer le projet');
    this.userService.delete(id).subscribe(
      () => {
        this.idToDelete.emit(id);
        console.log('delete reussie');
      }
    )
  }

}
