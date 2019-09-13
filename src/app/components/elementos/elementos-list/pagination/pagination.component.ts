import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges{

  @Input() private totalPages: number
  @Input() private numberPage: number;
  @Input() private pages: number[] = [];
  @Input() public numElements: number;
  @Output() paginaEmitter: EventEmitter<number> = new EventEmitter();

  disabledPrevious: string = 'disabled';


  constructor(
  ) { }

  ngOnInit() {
 
  }
  ngOnChanges(changes:SimpleChanges){
    //aqui controla los cambios en numberPage para activar el boton activo en la paginacion
    if(changes.numberPage && changes.numberPage.currentValue){
      this.showButtonAsActive(changes.numberPage.currentValue)
      
    }
  }

  previusPage() {
    this.numberPage--
    this.happenPage()
  }

  nextPage() {
    console.log(this.numberPage);
    
    this.numberPage++
    this.happenPage()
  }

  private showButtonAsActive(page) {
    var header = document.getElementById("buttonPage");
    var item = header.getElementsByClassName('page-item')    
    var current = header.getElementsByClassName("page-item active");
    //quita la clase active del elemento actual
    current[0].className = current[0].className.replace(" active", "")
    //agrega la clase active al elemento seleccionado
    item[page].className+=" active"
    
  }
  happenPage(page = 0) {
    var _page: number
    
    //si page es igual a 0 entonces se clickeo el boton anterior o siguiente
    if (page == 0)

      _page = this.numberPage;
    else
      _page = page

    this.paginaEmitter.emit(_page)
  }

}
