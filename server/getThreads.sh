#!/bin/bash

# Default values
MAX_RESULTS=10

# Parse flags
while getopts ":m:" opt; do
  case $opt in
    m) MAX_RESULTS="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
        usage
    ;;
    :) echo "Option -$OPTARG requires an argument." >&2
       usage
    ;;
  esac
done

# Check if MAX_RESULTS is provided and is a positive integer
if ! [[ "$MAX_RESULTS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: MAX_RESULTS must be a positive integer."
  usage
fi
 
# Set your user ID and access token
USER_ID="104242808218505744506"
ACCESS_TOKEN="ya29.a0AXooCguE9NNH3hZeU7HhbBA3J6o6rvrn6zmXxDlT1c0P086OmvtXlsyBUjRs3YinkZf-n52J5m0C8v4OiJdQNVJdLrF78UUYtTn-_KXp6GbifNPM2RMH9PdE2Tm2-v0dywgcDjG3GDRd1CP2LLmS3XoWzb0j4ZhC9XrEaCgYKAcQSARISFQHGX2MizMhy7Zrfh3gYIQFWx5LkdQ0171"

# Measure time for the initial request to get thread IDs
start_time_initial=$(date +%s%3N)

# Get the IDs of the first 10 threads
THREAD_RESPONSE=$(curl -s --location "https://gmail.googleapis.com/gmail/v1/users/$USER_ID/threads?includeSpamTrash=true&maxResults=$MAX_RESULTS&q=category:primary" \
--header "Authorization: Bearer $ACCESS_TOKEN")

end_time_initial=$(date +%s%3N)
initial_request_time=$((end_time_initial - start_time_initial))

echo "Thread Response: $THREAD_RESPONSE" # Debugging: Show the response

THREAD_IDS=$(echo "$THREAD_RESPONSE" | jq -r '.threads[].id')
NEXT_PAGE_TOKEN=$(echo "$THREAD_RESPONSE" | jq -r '.nextPageToken')
HISTORY_ID=$(echo "$THREAD_RESPONSE" | jq -r '.historyId')

# echo "Thread IDs: $THREAD_IDS" # Debugging: Show thread IDs
# echo "Next Page Token: $NEXT_PAGE_TOKEN" # Debugging: Show nextPageToken
# echo "History ID: $HISTORY_ID" # Debugging: Show historyId

# Initialize an empty array to store the messages
MESSAGES=()

# Measure time for fetching detailed thread data
start_time_details=$(date +%s%3N)

# Loop over each thread ID and get the detailed data (metadata only)
for THREAD_ID in $THREAD_IDS; do
  THREAD_DETAIL=$(curl -s --location "https://gmail.googleapis.com/gmail/v1/users/$USER_ID/threads/$THREAD_ID?fields=messages(id,threadId,labelIds,snippet,historyId,internalDate,headers)" \
  --header "Authorization: Bearer $ACCESS_TOKEN" \
  --header "Content-Type: application/json")

  # echo "Thread Detail: $THREAD_DETAIL" # Debugging: Show thread detail

  # Extract messages and add to the array
  THREAD_MESSAGES=$(echo "$THREAD_DETAIL" | jq '.messages')
  MESSAGES+=("$THREAD_MESSAGES")
done

end_time_details=$(date +%s%3N)
details_request_time=$((end_time_details - start_time_details))

# echo "Messages: ${MESSAGES[@]}" # Debugging: Show collected messages

# Join the messages data into a single JSON array
JOINED_MESSAGES=$(jq -s 'add' <<<"${MESSAGES[@]}")

# Create the final output with id, nextPageToken, historyId, and messages
FINAL_OUTPUT=$(jq -n --arg id "$USER_ID" --arg nextPageToken "$NEXT_PAGE_TOKEN" --arg historyId "$HISTORY_ID" --argjson messages "$JOINED_MESSAGES" \
'{id: $id, nextPageToken: $nextPageToken, historyId: $historyId, messages: $messages}')

# Format the JSON with colors
echo "$FINAL_OUTPUT" | jq '.'

# Save the final output to a file (optional)
echo "$FINAL_OUTPUT" > joined_thread_data.json

echo "Joined thread data saved to joined_thread_data.json"

# Print the benchmark times
echo "Time taken for the initial request: ${initial_request_time} ms"
echo "Time taken for the detailed requests: ${details_request_time} ms"

