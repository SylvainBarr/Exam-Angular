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
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.character$ = this.characterService.getById(parseInt(id))
    }else{
      this.router.navigateByUrl('/characters')
    }
  }

}
