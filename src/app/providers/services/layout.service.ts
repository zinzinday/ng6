import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  is: {
    XSmall: boolean, Small: boolean, Medium: boolean, Large: boolean, XLarge: boolean,
    Handset: boolean, HandsetLandscape: boolean, HandsetPortrait: boolean,
    Tablet: boolean, TabletLandscape: boolean, TabletPortrait: boolean,
    Web: boolean, WebLandscape: boolean, WebPortrait: boolean,
  };

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private breakpoint: BreakpointObserver) {
    this.observe();
  }

  get index(): number {
    switch (this.router.url.toString()) {
      case '/register':
      case '/login':
        return 1;
      default:
        return 0;
    }
  }

  observe() {
    return this.breakpoint.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
      Breakpoints.Handset,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.Tablet,
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.Web,
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait
    ]).subscribe(() => {
      this.is = {
        XSmall: this.breakpoint.isMatched(Breakpoints.XSmall),
        Small: this.breakpoint.isMatched(Breakpoints.Small),
        Medium: this.breakpoint.isMatched(Breakpoints.Medium),
        Large: this.breakpoint.isMatched(Breakpoints.Large),
        XLarge: this.breakpoint.isMatched(Breakpoints.XLarge),
        Handset: this.breakpoint.isMatched(Breakpoints.Handset),
        HandsetLandscape: this.breakpoint.isMatched(Breakpoints.HandsetLandscape),
        HandsetPortrait: this.breakpoint.isMatched(Breakpoints.HandsetPortrait),
        Tablet: this.breakpoint.isMatched(Breakpoints.Tablet),
        TabletLandscape: this.breakpoint.isMatched(Breakpoints.TabletLandscape),
        TabletPortrait: this.breakpoint.isMatched(Breakpoints.TabletPortrait),
        Web: this.breakpoint.isMatched(Breakpoints.TabletPortrait),
        WebLandscape: this.breakpoint.isMatched(Breakpoints.WebLandscape),
        WebPortrait: this.breakpoint.isMatched(Breakpoints.WebPortrait),
      };
    });
  }

  get isWeb(): boolean {
    return this.is.Web || this.is.WebLandscape || this.is.WebPortrait;
  }

  get isTablet(): boolean {
    return this.is.Tablet || this.is.TabletLandscape || this.is.TabletPortrait;
  }

  get isHandset(): boolean {
    return this.is.Handset || this.is.HandsetLandscape || this.is.HandsetPortrait;
  }

  alert(message, action: string = 'Dismiss', duration: number = 3000) {
    this.snackBar.open(message, action, {duration: duration});
  }

}
