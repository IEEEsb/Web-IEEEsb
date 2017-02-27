import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    
    public get(key: string): any {
        var value = localStorage.getItem(key);
        return value && JSON.parse(value);
    }
    
    public set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}