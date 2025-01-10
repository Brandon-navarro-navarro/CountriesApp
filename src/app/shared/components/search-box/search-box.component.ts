import { Component, ElementRef, EventEmitter, Input, input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: false,

  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSubs?: Subscription;

  @Output()
  public onValue = new EventEmitter<string>();

  @Input()
  public initialValue: string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public placeholder:string = ""

  @ViewChild("txtSearch")
  public txtSearch!: ElementRef<HTMLInputElement>

  ngOnInit(): void {

   this.debouncerSubs = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubs?.unsubscribe();
  }


  onSearch(){
    const valSearch = this.txtSearch.nativeElement.value;
    this.onValue.emit(valSearch);
  }

  onKeyPress(){
    const valSearch = this.txtSearch.nativeElement.value;
    this.debouncer.next(valSearch);
  }

}
