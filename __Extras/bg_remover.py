# from rembg import remove
# import easygui
# from PIL import Image

# input_path = easygui.fileopenbox(title="Select image file")
# output_path = easygui.filesavebox(title="Save file to:")

# input = Image.open(input_path)
# output = remove(input)
# output.save(output_path)


import pandas as pd
from googleapiclient.discovery import build

# Define your API key and YouTube API service
api_key = "AIzaSyChUrJuR2fE97Im-BgPlRI5-WrGhaFCtVg"
youtube = build("youtube", "v3", developerKey=api_key)


def get_playlists(channel_id):
    request = youtube.playlists().list(
        part="snippet,contentDetails", channelId=channel_id, maxResults=50
    )
    response = request.execute()
    return response["items"]


def get_videos(playlist_id):
    videos = []
    request = youtube.playlistItems().list(
        part="snippet,contentDetails", playlistId=playlist_id, maxResults=50
    )
    response = request.execute()
    for item in response["items"]:
        video_id = item["contentDetails"]["videoId"]
        video_details = get_video_details(video_id)
        videos.append(video_details)
    return videos


def get_video_details(video_id):
    request = youtube.videos().list(part="snippet,contentDetails", id=video_id)
    response = request.execute()
    video = response["items"][0]
    video_info = {
        "video_name": video["snippet"]["title"],
        "video_url": f"https://www.youtube.com/watch?v={video_id}",
        "duration": video["contentDetails"]["duration"],
        "preview_image": video["snippet"]["thumbnails"]["high"]["url"],
    }
    return video_info


def scrape_youtube_data(channel_id):
    playlists = get_playlists(channel_id)
    data = []

    for playlist in playlists:
        playlist_name = playlist["snippet"]["title"]
        videos = get_videos(playlist["id"])

        for video in videos:
            row = [
                playlist_name,
                video["video_name"],
                video["video_url"],
                video["duration"],
                video["preview_image"],
            ]
            data.append(row)

    df = pd.DataFrame(
        data,
        columns=[
            "Playlist Name",
            "Video Name",
            "Video URL",
            "Duration",
            "Preview Image",
        ],
    )
    return df


# Replace 'YOUR_CHANNEL_ID' with your actual channel ID
channel_id = "UCpFFpfulZ2v_pu7uRBgpfbg"
df = scrape_youtube_data(channel_id)

# Save the data to a CSV file
df.to_csv("youtube_data.csv", index=False)
print("Data saved to youtube_data.csv")
