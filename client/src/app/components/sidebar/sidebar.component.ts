import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage?: string = '';
  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  constructor(
    private overlayContainer: OverlayContainer,
    private router: Router
  ) {}

  navItems = [
    { icon: 'home', text: 'Home', backgroundColor: false, route: '/home' },
    {
      icon: 'search',
      text: 'Search',
      backgroundColor: false,
      route: '/search',
    },
    { icon: 'notifications', text: 'Notifications', backgroundColor: false },
    { icon: 'chat', text: 'Message', backgroundColor: false, route: '/chat' },
    {
      icon: 'diversity_2',
      text: 'Group',
      backgroundColor: false,
      route: '/group',
    },
    { icon: 'account_circle', text: 'Profile', backgroundColor: false },
  ];

  ngOnInit(): void {
    const currentRoute = this.router.url;

    this.navItems.forEach((nav) => {
      if (nav.route === currentRoute) {
        nav.backgroundColor = true;
      } else {
        nav.backgroundColor = false;
      }
    });
  }

  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }

  changeBackgroundColor(selectedNav: any) {
    if (selectedNav.backgroundColor) {
      return;
    }
    this.navItems.forEach((nav) => {
      if (nav == selectedNav) {
        nav.backgroundColor = true;
        this.currentPage = nav.route;
      } else {
        nav.backgroundColor = false;
        // Đặt lại màu nền cho biểu tượng cũ
      }
    });

    this.router.navigate([selectedNav.route]);
  }
  return(icon: string) {
    // Chuyển hướng đến trang home
    this.router.navigate(['/home']);

    // Đặt màu nền của biểu tượng tương ứng thành true và của các biểu tượng khác thành false
    this.navItems.forEach((nav) => {
      nav.backgroundColor = nav.icon === icon;
    });
  }
  openPostDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closePostDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }
}
