import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  userSubscription?: Subscription;
  dataUsers?: User[];
  dataUser?: User[];

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

  tolowerRole(roleName:any){
    const role:any = {
        ROLE_EMPLOYE: 'Employe',
        ROLE_CLIENT: 'Client',
        ROLE_ADMIN: 'Admin',
    }
    return role[roleName];
  }

  toBack(event:any){//permet de revenir en haut
    window.scrollTo(0,0);//permet de definir l'endroit exact (en px) pour revenir dans la page
    event.preventDefault();
  }
}
