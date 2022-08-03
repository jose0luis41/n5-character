import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Character} from "../../model/character";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {

  @Input() character: Character = new Character('','','');

  constructor() { }

  ngOnInit(): void {
  }

}
