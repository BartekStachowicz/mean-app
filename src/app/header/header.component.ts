import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navLinks: any[];
  activeLinkId = -1;
  isAuth = false;
  private sub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.navLinks = [
      {
        label: 'My messages',
        link: '/',
        index: 0,
        exact: true,
      },
      {
        label: 'New Post',
        link: '/create',
        index: 1,
        exact: false,
      },
    ];
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routePath) => {
        this.activeLinkId = this.navLinks.findIndex(
          (tab) => tab.link === '.' + routePath
        );
      });

    this.sub = this.authService.getAuthStatusListener().subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
