#!/bin/bash
cd /home/kavia/workspace/code-generation/enterprise-empire-94985-95006/main_container_for_enterprise_empire
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

