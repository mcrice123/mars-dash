import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex size-40 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon className="text-white dark:text-black" />
            </div>
            
        </>
    );
}
