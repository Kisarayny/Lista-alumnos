import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YouTubeService {
  private apiKey = 'AIzaSyCBNh4Zdih1ZZRVeusTqe1X_jpRJtOAcXo';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  getVideos(query: string) {
    return this.http.get(`${this.apiUrl}/search`, {
      params: {
        part: 'snippet',
        maxResults: '10',
        q: query,
        key: this.apiKey,
      },
    });
  }
}
