#!/bin/bash
# Installs the notebooklm CLI used by the notebooklm skill in cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v notebooklm >/dev/null 2>&1; then
  pip install --quiet --disable-pip-version-check --root-user-action=ignore notebooklm-py
fi

notebooklm --version
