import { Component } from '@angular/core';
import {CharacterService} from "../../service/character/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Character} from "../../model/character.model";

@Component({
  selector: 'app-character-new',
  templateUrl: './character-new.component.html',
  styleUrls: ['./character-new.component.scss']
})
export class CharacterNewComponent {

  constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router) {
  }

  onHandleFormSubmitted(newCharacter: Omit<Character, 'id'|'location'|'url'|'origin'|'episode'|'created'>){
    this.characterService
      .create(newCharacter)
      .then(()=>this.router.navigateByUrl('/characters'))
  }

}
