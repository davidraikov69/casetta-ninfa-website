#!/bin/bash
# Installs the notebooklm CLI used by the notebooklm skill in cloud sessions
# and, when NOTEBOOKLM_MASTER_TOKEN_JSON is set, authenticates it.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# [headless] pulls in gpsoauth, needed for master-token auth.
if ! command -v notebooklm >/dev/null 2>&1 || ! python3 -c "import gpsoauth" >/dev/null 2>&1; then
  pip install --quiet --disable-pip-version-check --root-user-action=ignore "notebooklm-py[headless]"
fi

notebooklm --version

if [ -n "${NOTEBOOKLM_MASTER_TOKEN_JSON:-}" ]; then
  profile_dir="${NOTEBOOKLM_HOME:-$HOME/.notebooklm}/profiles/${NOTEBOOKLM_PROFILE:-default}"
  mkdir -p "$profile_dir"
  chmod 700 "$profile_dir"
  (umask 077 && printf '%s' "$NOTEBOOKLM_MASTER_TOKEN_JSON" > "$profile_dir/master_token.json")
  chmod 600 "$profile_dir/master_token.json"
  if notebooklm auth refresh >/dev/null 2>&1; then
    echo "NotebookLM: authenticated from master token"
  else
    echo "NotebookLM: master token present but 'notebooklm auth refresh' failed" >&2
  fi
else
  echo "NotebookLM: NOTEBOOKLM_MASTER_TOKEN_JSON not set, skipping auth"
fi
