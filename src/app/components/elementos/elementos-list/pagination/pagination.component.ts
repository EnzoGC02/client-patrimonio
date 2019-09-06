import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() private totalPages:number
  @Input() private numberPage: number;
  @Input() private pages: number[]=[];
  @Input() public numElements: number;
  @Output() paginaEmitter: EventEmitter<number> =  new EventEmitter();

  disabledPrevious:string='disabled';


  constructor() { }

  ngOnInit() {
    
  }

  previusPage(){
    this.numberPage--
    this.happenPage()
  }

  nextPage(){
    this.numberPage++
    this.happenPage()
  }
  happenPage(){
    this.paginaEmitter.emit(this.numberPage)
  }

}
