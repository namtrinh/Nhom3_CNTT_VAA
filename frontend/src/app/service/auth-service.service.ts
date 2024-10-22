import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import jwt_decode, { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    constructor(private router: Router) { }

    getUserRole(): number {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token) as any;
                const userRole = decodedToken.scope;
                localStorage.setItem('user_Id',decodedToken.userId)

                // Phân quyền bằng số
                switch (userRole) {
                    case 'ROLE_ADMIN':
                        return 1;
                    case 'ROLE_USER':
                        return 2;
                    default:
                        return 3;
                }
            } catch (error) {
                console.error('Token không hợp lệ');
            }
        }
        return 3;
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const userRole = this.getUserRole();
        const requiredRole = route.data["role"];
        if (userRole <= requiredRole) {
            return true;
        }
        this.router.navigate(['/???']);
        return false;
    }
}
