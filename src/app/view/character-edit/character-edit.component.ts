import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character.model";
import {CharacterService} from "../../service/character/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit{

  characterToUpdate?: Character



  constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.characterService.getById(parseInt(id))
        .then(response => {
          this.characterToUpdate = response
          if(!this.characterToUpdate){
            this.router.navigateByUrl('/characters')
          }
        })


    }
  }

  onHandleFormSubmitted(characterUpdated: Omit<Character, 'id'|'location'|'url'|'origin'|'episode'|'created'>){
    this.characterService
      .update(this.characterToUpdate!.id, characterUpdated)
      .then(()=>this.router.navigateByUrl('/characters'))
  }

}
