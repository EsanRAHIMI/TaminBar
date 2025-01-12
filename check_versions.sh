#!/bin/bash

# تعریف رنگ‌ها
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # بدون رنگ

# تاریخ و زمان فعلی
CURRENT_DATETIME=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="./check_versions.log"

# افزودن تاریخ به لاگ
echo -e "\n=====================================" >> "$LOG_FILE"
echo -e "Execution Time: $CURRENT_DATETIME" >> "$LOG_FILE"
echo -e "=====================================" >> "$LOG_FILE"

# اطلاعات ابزارها
echo -e "${CYAN}=====================================${NC}"
echo -e "${BLUE}System and Tools Versions${NC}"
echo -e "${CYAN}=====================================${NC}" | tee -a "$LOG_FILE"
echo -e "${GREEN}Node.js Version:${NC} $(node -v)" | tee -a "$LOG_FILE"
echo -e "${GREEN}NPM Version:${NC} $(npm -v)" | tee -a "$LOG_FILE"
echo -e "${GREEN}NVM Version:${NC} $(nvm --version 2>/dev/null || echo 'NVM not found')" | tee -a "$LOG_FILE"
echo -e "${GREEN}TypeScript Version:${NC} $(tsc -v 2>/dev/null || echo 'TypeScript not found')" | tee -a "$LOG_FILE"
echo -e "${GREEN}Vite Version:${NC} $(vite --version 2>/dev/null || echo 'Vite not found')" | tee -a "$LOG_FILE"
echo -e "${GREEN}Docker Version:${NC} $(docker --version)" | tee -a "$LOG_FILE"

echo -e "${GREEN}PostgreSQL Version:${NC}" | tee -a "$LOG_FILE"
if [ -f "./backend/.env" ]; then
  source ./backend/.env
  POSTGRES_VERSION=$(docker exec -i SimorX_DB psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" | grep "PostgreSQL" | xargs)
  echo "$POSTGRES_VERSION" | tee -a "$LOG_FILE"
else
  echo -e "${RED}.env file not found.${NC}" | tee -a "$LOG_FILE"
fi

echo -e "${GREEN}Git Version:${NC} $(git --version)" | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"

# پکیج‌های NPM
echo -e "${BLUE}Checking Frontend Local NPM Packages:${NC}" | tee -a "$LOG_FILE"
(cd frontend && npm list --depth=0) | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"

echo -e "${BLUE}Checking Backend Local NPM Packages:${NC}" | tee -a "$LOG_FILE"
(cd backend && npm list --depth=0) | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"

# ساختار دایرکتوری پروژه
echo -e "${BLUE}Project Directory Structure (Excluding node_modules):${NC}" | tee -a "$LOG_FILE"
tree -I 'node_modules' -L 5 | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"

# وضعیت کانتینرهای Docker
echo -e "${BLUE}Docker Containers Status:${NC}" | tee -a "$LOG_FILE"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}" | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"

# وضعیت Git
echo -e "${BLUE}Git Repository Status:${NC}" | tee -a "$LOG_FILE"
git status | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"

# پورت‌های باز
echo -e "${BLUE}Ports in Use:${NC}" | tee -a "$LOG_FILE"
lsof -i -P -n | grep LISTEN | tee -a "$LOG_FILE"
echo -e "${CYAN}-------------------------------------${NC}" | tee -a "$LOG_FILE"
