#!/usr/bin/env bash
# PostToolUse hook (Edit|Write matcher) - already configured in .claude/settings.json.
# Reads the tool-call JSON from stdin and, if the edited file touches the schema
# or a migration, prints a reminder to stderr. It does not block anything - this
# project treats SQL review as a human responsibility, not something to silently
# auto-approve or auto-block.

input=$(cat)
file_path=$(echo "$input" | grep -o '"file_path"[^,}]*' | head -1)

if echo "$file_path" | grep -qE 'schema\.sql|migrations/'; then
  echo "[hook] Schema or migration file touched - remember: raw SQL must be reviewed by a human before it runs against any shared environment." >&2
fi

exit 0
