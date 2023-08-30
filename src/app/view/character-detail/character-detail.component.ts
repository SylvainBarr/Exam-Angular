import {Component, OnInit} from '@angular/core';
import {Character} from "../../model/character.model";
import {CharacterService} from "../../service/character/character.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit{

  character$!: Promise<Character>

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // get the id on the URL
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      // get the character if there is an id
      this.character$ = this.characterService.getById(parseInt(id))
    }else{
      this.router.navigateByUrl('/characters')
    }
  }


  /*
  * Function called when the delete button is clicked by the user,
  * send the character id as parameter to the delete function to the Character Service
   */
  onClickDelete(characterId: number) {
    this.characterService
      .delete(characterId)
      .then(()=>this.router.navigateByUrl('/characters'))
  }
}
